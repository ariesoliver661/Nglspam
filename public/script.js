   function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function startSpamming() {
        const username = document.getElementById('username').value;
        const message = document.getElementById('message').value;
        const amount = parseInt(document.getElementById('amount').value);
        const responseDiv = document.getElementById('response');
        const logsDiv = document.getElementById('logs');
        const deviceId = 'myDevice';  // Updated deviceId

        if (username === '' || message === '' || isNaN(amount) || amount <= 0) {
            responseDiv.className = 'error';
            responseDiv.textContent = 'Please fill out all fields';
            return;
        }

        responseDiv.textContent = 'Sending messages...';
        responseDiv.className = '';

        logsDiv.innerHTML = '';

        for (let i = 0; i < amount; i++) {
            try {
                const response = await fetch(`https://nash-api-end-5swp.onrender.com/ngl?username=${username}&message=${message}&deviceId=${deviceId}&amount=1`);
                const data = await response.json();
                console.log('Response:', data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                logsDiv.innerHTML += `<div>Message ${i + 1} sent successfully</div>`;
                await sleep(2000);  // Sleep for 2 seconds
            }
        }

        responseDiv.className = 'success';
        responseDiv.textContent = `All messages successfully sent.`;
    }

    function updateDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US');
        const formattedTime = now.toLocaleTimeString('en-US');
        document.getElementById('datetime').textContent = `${formattedDate} ${formattedTime}`;
    }

    function getUserInfo() {
        fetch('https://ipinfo.io/json?token=60117f9430a2b5')
            .then(response => response.json())
            .then(data => {
                const userInfoDiv = document.getElementById('user-info');
                userInfoDiv.innerHTML = `Your IP: ${data.ip}<br>Your Location: ${data.city}, ${data.region}, ${data.country}`;
            })
            .catch(error => {
                console.error('Error fetching IP and location:', error);
            });
    }

    setInterval(updateDateTime, 1000);
    window.onload = getUserInfo;