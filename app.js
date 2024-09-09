const tg = window.Telegram.WebApp;
tg.expand();

let userId = tg.initDataUnsafe.user.id;

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
        const walletAddress = await tg.requestTonAddress();
        // In a real app, you'd send this data to your server
        // For this demo, we'll just update the UI
        const user = {
            id: userId,
            walletAddress: walletAddress.address,
            referrals: []
        };
        displayUserInfo(user);
        tg.showAlert('Wallet connected successfully!');
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        tg.showAlert('Failed to connect wallet. Please try again.');
    }
});

document.getElementById('copyReferral').addEventListener('click', () => {
    const referralLink = document.getElementById('referralLink');
    referralLink.select();
    document.execCommand('copy');
    tg.showAlert('Referral link copied to clipboard!');
});

// For demo purposes, we'll display some placeholder data
displayUserInfo({
    id: userId,
    walletAddress: '',
    referrals: []
});