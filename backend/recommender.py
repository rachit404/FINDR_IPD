import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import chardet

features = {
    "Datasets/CoffeeMachineData.csv":{
            "numerical":['Capacity (Liters)','Power Output (kW)','Price (INR)','Brew Time (Minutes)','Weight (kg)'],
            "categorical":['Machine Name','Type','Ease of Use','Brew Quality'],
            "threshold" : 0.50
        },
    "Datasets/Fruit_Veg_Processing_Machines.csv": {
            "numerical":['Speed (kg/hr)', 'Power Input (kW)', 'Efficiency (%)','Price (INR)'],
            "categorical":['Machine Name', 'MType', 'MachineMaterial','Manufacturer'],
            "threshold" : 0.30
        },
    "Datasets/grain_machinery_data.csv":{
            "numerical":['Capacity (tons/hour)', 'Power Output (kW)', 'Price (INR)'],
            "categorical":['Grain', 'Machine Name', 'Grain Manufacturer'],
            "threshold" : 0.35
        },
    "Datasets/Ice_Cream_Makers.csv":{
            "numerical":['Noise Levels','Power(W)','Price (INR)'],
            "categorical":['Machine Name', 'Capacity', 'Batch Output'],
            "threshold" : 0.50
        },
    "Datasets/juice_makers.csv":
        {
            "numerical":[
                        'Motor Power (W)', 'Juicing Speed (RPM)', 'Noise Level (dB)',
                        'Customer Rating', 'Number of Reviews', 'Price (INR)',
                        ],
            "categorical":['Machine Name', 'Material','Type of Juicer'],
            "threshold" : 0.60
        },
    
}

datasets = ["Datasets/CoffeeMachineData.csv",
            "Datasets/Fruit_Veg_Processing_Machines.csv",
            "Datasets/grain_machinery_data.csv",
            "Datasets/Ice_Cream_Makers.csv",
            "Datasets/juice_makers.csv",]

def findr(file_path, user_input, findr_col, num_recomm=10):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read())
        
    df = pd.read_csv(file_path,encoding=result['encoding'])
    categorical_cols = features[file_path]["categorical"]
    numerical_cols = features[file_path]["numerical"]
    
    threshold = features[file_path]["threshold"]
    
    df[categorical_cols] = df[categorical_cols].fillna('')
    df['combined_features'] = df[categorical_cols].apply(lambda x: ' '.join(x).lower(), axis=1)
    for col in numerical_cols:
        if col not in df.columns:
            raise ValueError(f"Numerical column '{col}' is missing in the dataset.")
    
    scaler = MinMaxScaler()
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    tfidf = TfidfVectorizer(stop_words='english')
    text_features = tfidf.fit_transform(df['combined_features'])

    combined_features_matrix = np.hstack([
        text_features.toarray(),
        df[numerical_cols].values
    ])

    cosine_sim = cosine_similarity(combined_features_matrix)
    column = findr_col
    matching_rows = df[df[column].str.contains(user_input, case=False, na=False)]

    if matching_rows.empty:
        return f"Machine '{user_input}' not found in the dataset."

    idx = matching_rows.index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    print("Sim_scores: \n")
    for score in sim_scores:
        print(score)
    print("Length: ",len(sim_scores))
    
    # sum1 = np.sum(score[1] for score in sim_scores) 
    
    sim_score1 = []
    for score in sim_scores:
        if score[1] >= threshold:
            sim_score1.append(score)
            
    print("Sim_scores: \n")
    for score in sim_score1:
        print(score)
    print("Length after threshold: ",len(sim_score1))
    
    sim_indices = [i[0] for i in sim_score1[1:num_recomm+1]]

    df = pd.read_csv(file_path,encoding=result['encoding'])
    data = df.iloc[sim_indices]
    return data

# user_input = 'drip'
# findr_col = 'Type'
# num_recommendations = 15
# recommendations = findr(datasets[0], user_input, findr_col,num_recomm=num_recommendations) # incomplete - take datasets index from 
# print(type(recommendations))
# print(recommendations)