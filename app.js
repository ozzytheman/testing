<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TG Mini App</title>
    <script src="https://telegram.org/js/telegram-web-app.js?1"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>TG Mini App</h1>
        <div id="userInfo"></div>
        <button id="connectWallet">Connect Wallet</button>
        <div id="referralSection" style="display:none;">
            <h2>Refer a Friend</h2>
            <input type="text" id="referralLink" readonly>
            <button id="copyReferral">Copy Referral Link</button>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
