const tg = window.Telegram.WebApp;

// Ensure the Web App is fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    initApp();
});

function initApp() {
    tg.expand();

    let userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : 'Unknown';

    function displayUserInfo(user) {
        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = `
            <p>User ID: ${user.id}</p>
            <p>Wallet Address: ${user.walletAddress || 'Not connected'}</p>
            <p>Referrals: ${user.referrals ? user.referrals.length : 0}</p>
        `;
        if (user.walletAddress) {
            document.getElementById('connectWallet').style.display = 'none';
            document.getElementById('referralSection').style.display = 'block';
            document.getElementById('referralLink').value = `https://t.me/your_bot_username?start=${user.id}`;
        }
    }

    document.getElementById('connectWallet').addEventListener('click', async () => {
        try {
            // Check if TON features are available
            if (!tg.ton) {
                throw new Error('TON features are not available');
            }

            // Request TON address
            const tonAddresses = await tg.ton.requestAccounts();
            if (tonAddresses.length === 0) {
                throw new Error('No TON addresses returned');
            }
            const walletAddress = tonAddresses[0];

            // In a real app, you'd send this data to your server
            // For this demo, we'll just update the UI
            const user = {
                id: userId,
                walletAddress: walletAddress,
                referrals: []
            };
            displayUserInfo(user);
            tg.showPopup({ message: 'Wallet connected successfully!' });
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            tg.showPopup({ 
                message: `Failed to connect wallet: ${error.message}. Please make sure you're using the Telegram app and have a wallet set up.`
            });
        }
    });

    document.getElementById('copyReferral').addEventListener('click', () => {
        const referralLink = document.getElementById('referralLink');
        referralLink.select();
        document.execCommand('copy');
        tg.showPopup({ message: 'Referral link copied to clipboard!' });
    });

    // For demo purposes, we'll display some placeholder data
    displayUserInfo({
        id: userId,
        walletAddress: '',
        referrals: []
    });
}
