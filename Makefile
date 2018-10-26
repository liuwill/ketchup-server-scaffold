production:
	pm2 startOrRestart process.prod.json --no-daemon
.PHONY: production
