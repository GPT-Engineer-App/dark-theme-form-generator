# dark-theme-form-generator

MAKE A WEBSITE USING THIS EXACT CODE 


FULLY

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Geração de Laudos Radiológicos</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Custom CSS for styling to match the dark theme -->
    <style>
        body {
            background-color: #000; /* Black background */
            background-image: linear-gradient(315deg, #000 0%, #234465 74%, #880e4f 100%);
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .form-container {
            background-color: #232323; /* Slightly lighter background for form container */
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .custom-logo {
            background: url('https://i.ibb.co/1YVXjS8/natan-paraisk-The-logo-consists-of-abstract-shaped-forms-spelli-5c438335-6115-47fb-98ce-c9d0b5907cca.webp') center no-repeat;
            background-size: cover; /* Ensure the logo covers the header area */
            height: 150px; /* Adjust as needed */
            width: 100%; /* Full width to accommodate the full logo */
        }
        .btn-custom {
            background-color: #17a2b8; /* Subtle blue for buttons */
            border: none;
            color: white;
        }
        .loading-indicator {
            display: none;
            text-align: center;
            margin-top: 20px;
            color: white;
        }
        .success-message {
            display: none;
            margin-top: 20px;
            color: #28a745;
        }
    </style>
</head>
<body>
    <header>
        <div class="custom-logo"></div>
    </header>

    <div class="container">
        <div class="form-container">
            <form id="formLaudo">
                <div class="form-group">
                    <label for="exame">Exame:</label>
                    <input type="text" class="form-control" id="exame" name="exame" required>
                </div>
                <div class="form-group">
                    <label for="achados">Achados:</label>
                    <textarea class="form-control" id="achados" name="achados" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-custom">Generate Report</button>
            </form>
        </div>

        <div class="loading-indicator" id="loadingIndicator">
            <p>Loading...</p>
        </div>

        <div class="success-message" id="successMessage">
            <h3>Laudo 2ª versão:</h3>
            <div id="laudo2versao"></div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
        const API_KEY = "sk-Aq4JuoJ0qEEXYdGzrEwbdHvmYGrIsBjcXZgI0e9D8LiqNFsHEc7c1a";
        const promptId = "dfe57768-c79c-4400-8a79-12fe648cf483";

        const formLaudo = document.getElementById('formLaudo');
        const laudo2versaoDiv = document.getElementById('laudo2versao');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const successMessage = document.getElementById('successMessage');

        formLaudo.addEventListener('submit', async (event) => {
            event.preventDefault();

            const exame = document.getElementById('exame').value;
            const achados = document.getElementById('achados').value;

            loadingIndicator.style.display = 'block';
            successMessage.style.display = 'none';

            const response = await fetch(`https://app.wordware.ai/api/prompt/${promptId}/run`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {
                        exame: exame,
                        achados: achados
                    }
                })
            });

            loadingIndicator.style.display = 'none';
            successMessage.style.display = 'block';

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                buffer.push(chunk);

                const lines = buffer.join('').split('\n');
                buffer = [lines.pop()];

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    const content = JSON.parse(line);
                    const value = content.value;

                    if (value.type === 'outputs') {
                        const laudo2versao = value.outputs.Laudo2versao;
                        laudo2versaoDiv.innerHTML = laudo2versao;
                    }
                }
            }
        });
    </script>
</body>
</html>


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/dark-theme-form-generator.git
cd dark-theme-form-generator
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
