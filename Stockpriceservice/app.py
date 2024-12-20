from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from pymongo import MongoClient
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient(os.getenv('MONGO_URI'))
db = client["stock_notifications"]
collection = db["notifications"]

# Utility function to fetch stock price
def fetch_stock_price(stock_symbol):
    url = "https://api.marketstack.com/v1/eod"
    response = requests.get(url, params={"access_key": os.getenv('ACCESS_KEY'), "symbols": stock_symbol})
    data = response.json()
    if "data" in data and data["data"]:
        return data["data"][0].get("close")
    return None

# Log stock details in MongoDB
def log_notification(stock_name, price):
    collection.insert_one({"stock_name": stock_name, "price": price, "time": time.strftime("%Y-%m-%d %H:%M:%S")})

# Route for fetching stock price
@app.route('/get_stock_price', methods=['GET'])
def get_stock_price():
    stock_symbol = request.args.get('symbol')
    if not stock_symbol:
        return jsonify({"error": "Stock symbol is required"}), 400
    price = fetch_stock_price(stock_symbol)
    if price:
        return jsonify({"symbol": stock_symbol, "price": price})
    return jsonify({"error": "Failed to fetch stock price"}), 500

# Route for logging stock data
@app.route('/log_stock', methods=['POST'])
def log_stock():
    data = request.json
    stock_name = data.get('stock_name')
    if not stock_name:
        return jsonify({"error": "Stock name is required"}), 400
    price = fetch_stock_price(stock_name)
    if price:
        log_notification(stock_name, price)
        return jsonify({"message": f"Stock data for {stock_name} logged successfully."})
    return jsonify({"error": "Failed to fetch stock price"}), 500

if __name__ == '__main__':
    app.run(debug=True)
