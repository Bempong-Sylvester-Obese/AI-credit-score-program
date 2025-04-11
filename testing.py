import pandas as pd
df = pd.read_csv("data/raw/dataset1.csv")
print("Columns in dataset:", df.columns.tolist())