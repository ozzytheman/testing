const tg = window.Telegram.WebApp;

let tonConnectUI;

document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    initApp();
});

function initApp() {
    tg.expand();

    let userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : 'Unknown';

    // Initialize TON Connect UI
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ozzytheman.github.io/testing/tonconnect-manifest.json',
        buttonRootId: 'ton-connect'
    });

    // Set TWA return URL
    tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/mystixapp_bot'
    };

    function displayUserInfo(user) {
        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = `
            <p>User ID: ${user.id}</p>
            <p>Wallet Address: ${user.walletAddress || 'Not connected'}</p>
            <p>Referrals: ${user.referrals ? user.referrals.length : 0}</p>
        `;
        if (user.walletAddress) {
            document.getElementById('referralSection').style.display = 'block';
            document.getElementById('referralLink').value = `https://t.me/mystixapp_bot?start=${user.id}`;
        }
    }

    // Listen for wallet connections
    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            const user = {
                id: userId,
                walletAddress: wallet.account.address,
                referrals: []
            };
            displayUserInfo(user);
            tg.showPopup({ message: 'Wallet connected successfully!' });
        } else {
            displayUserInfo({ id: userId, walletAddress: '', referrals: [] });
        }
    });

    document.getElementById('copyReferral').addEventListener('click', () => {
        const referralLink = document.getElementById('referralLink');
        referralLink.select();
        document.execCommand('copy');
        tg.showPopup({ message: 'Referral link copied to clipboard!' });
    });

    // Initial display
    displayUserInfo({
        id: userId,
        walletAddress: '',
        referrals: []
    });
}

// Function to disconnect wallet (if needed)
async function disconnectWallet() {
    try {
        await tonConnectUI.disconnect();
        tg.showPopup({ message: 'Wallet disconnected successfully!' });
    } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        tg.showPopup({ 
            message: `Failed to disconnect wallet: ${error.message}`
        });
    }
}
