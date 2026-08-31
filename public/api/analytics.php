<?php
// ================================================
// GET /api/analytics (versi Hostinger — PHP)
// Server-side only — Personal API Key TIDAK PERNAH sampai ke browser
//
// Kontrak response IDENTIK sama api/analytics.js (versi Vercel):
//   { "pageviews": N, "ctaClicks": N }
// Frontend (useVisitorCounter.js) gak perlu tau ini PHP atau Node.
//
// Credential dibaca dari environment variable yang di-set via
// SetEnv di .htaccess — JANGAN hardcode value asli di file ini.
// ================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$personalApiKey = getenv('POSTHOG_PERSONAL_API_KEY');
$projectId      = getenv('POSTHOG_PROJECT_ID');
$appHost        = 'https://us.posthog.com'; // app host buat Query API (bukan ingestion host)

if (!$personalApiKey || !$projectId || strpos($personalApiKey, 'REPLACE_WITH') === 0) {
    http_response_code(500);
    echo json_encode(['error' => 'PostHog server env vars belum di-set di .htaccess']);
    exit;
}

function posthog_count($appHost, $projectId, $apiKey, $eventNames) {
    $inList = implode(', ', array_map(fn($n) => "'" . addslashes($n) . "'", $eventNames));
    $query  = "SELECT count() FROM events WHERE event IN ($inList) AND timestamp >= now() - INTERVAL 30 DAY";

    $body = json_encode([
        'query' => [
            'kind'  => 'HogQLQuery',
            'query' => $query,
        ],
    ]);

    $ch = curl_init("$appHost/api/projects/$projectId/query/");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $body,
        CURLOPT_HTTPHEADER     => [
            "Authorization: Bearer $apiKey",
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = json_decode($response, true);

    if ($httpCode < 200 || $httpCode >= 300) {
        error_log('PostHog API error: ' . $response);
        return 0;
    }

    return $data['results'][0][0] ?? 0;
}

try {
    $pageviews = posthog_count($appHost, $projectId, $personalApiKey, ['$pageview']);
    $ctaClicks = posthog_count($appHost, $projectId, $personalApiKey, ['cta_whatsapp_clicked', 'cta_scroll_clicked']);

    // Cache 15 detik di sisi browser/proxy — samain kayak versi Vercel
    header('Cache-Control: public, max-age=15');
    echo json_encode(['pageviews' => $pageviews, 'ctaClicks' => $ctaClicks]);
} catch (Exception $e) {
    error_log('PostHog query failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch analytics']);
}
