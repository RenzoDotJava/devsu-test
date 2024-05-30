
## Tech Stack

**Client:** TypesScript, React, React Native, Expo


## Run Locally

1. Start the server project (repo-interview-main)

```bash
npm run start:dev
```

2. Install [ngrok](https://ngrok.com/)

3. Open ngrok.exe

4. Save your ngrok token

```bash
ngrok config add-authtoken <YOUR-TOKEN>
```

5. Run the following command in the ngrok terminal

```bash
ngrok http http://localhost:3002
```

6. Copy the **forwarding url**

7. Clone the project

```bash
git clone https://github.com/RenzoDotJava/devsu-test.git
```

8. Go to the project directory

```bash
cd devsu-test
```

9. Install dependencies

```bash
npm install
```

10. Open the config file **(src\config\index.ts)**

11. Replace the **serverUrl** constant with the **forwarding url**

12. Start the project

```bash
npm run start
```


## Authors

- [@renzogbo](https://www.github.com/RenzoDotJava)

