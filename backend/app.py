from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from recommender import findr, datasets
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

user_input = 'drip'
findr_col = 'Type'
num_recommendations = 1000
df = findr(datasets[0], user_input, findr_col,num_recomm=num_recommendations)
df = df.where(pd.notnull(df), None)

data_frame = pd.DataFrame()

@app.route('/post-recommendation', methods=['POST','GET'])
def get_recommendations():
    global data_frame
    if request.method == 'POST':
        if request.is_json:
            data = request.json
            type_input = data.get('dropdown1')  
            feature_input = data.get('dropdown2') 
            user_input = data.get('dropdown3') 
            print(f"Received data: {data}")
            index = 0
            if type_input == 'Coffee':
                index = 0
            elif type_input == 'Fruit':
                index = 1
            elif type_input == 'Grain':
                index = 2
            elif type_input == 'Ice-cream':
                index = 3
            elif type_input == 'Juice':
                index = 4
            df = findr(datasets[index], user_input, feature_input,num_recomm=num_recommendations)
            data_frame = df
            return jsonify(df.to_dict(orient='records'))
        
    else:
        return jsonify(data_frame.to_dict(orient='records'))
    
@app.route('/get-data', methods=['GET'])
def get_data():
    df_data = jsonify(df.to_dict(orient='records'))
    print(type(df_data))
    return df_data

# Static Routes for each category
@app.route("/coffee-machines", methods=['GET'])
def coffee_machines():
    df_data = pd.read_csv(datasets[0],encoding='ISO-8859-1')
    return jsonify(df_data.to_dict(orient='records'))

@app.route("/vegetable-&-fruit-equipment", methods=['GET'])
def vegetable_fruit_equipment():
    df_data = pd.read_csv(datasets[1],encoding='ISO-8859-1')
    return jsonify(df_data.to_dict(orient='records'))

@app.route("/grain-processing-machines", methods=['GET'])
def grain_processing_machines():
    df_data = pd.read_csv(datasets[2],encoding='ascii')
    return jsonify(df_data.to_dict(orient='records'))

@app.route("/ice-cream-machines", methods=['GET'])
def ice_cream_machines():
    df_data = pd.read_csv(datasets[3],encoding='ISO-8859-1')
    return jsonify(df_data.to_dict(orient='records'))

@app.route("/juice-machines", methods=['GET'])
def juice_machines():
    df_data = pd.read_csv(datasets[4],encoding='ascii')
    return jsonify(df_data.to_dict(orient='records'))
        
@app.route('/')
def home():
      return """
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f9;
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    text-align: center;
                }
                li {
                    display: inline-block;
                    margin: 10px;
                }
                a {
                    text-decoration: none;
                    color: #007bff;
                    font-size: 18px;
                    padding: 8px 16px;
                    border: 2px solid #007bff;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }
                a:hover {
                    background-color: #007bff;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to Flask Backend!</h1>
            <ul>
                <li><a href="/coffee-machines">Coffee Machines</a></li>
                <li><a href="/vegetable-&-fruit-equipment">Vegetable & Fruit Equipment</a></li>
                <li><a href="/grain-processing-machines">Grain Processing Machines</a></li>
                <li><a href="/ice-cream-machines">Ice Cream Machines</a></li>
                <li><a href="/juice-machines">Juice Machines</a></li>
                <li><a href="/post-recommendation">Recommendations</a></li>
            </ul>
        </body>
    </html>
    """
    
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)