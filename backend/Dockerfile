FROM python

WORKDIR /app/backend

# Copy the dependencies file to the working directory
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 5000

# Fetch wb data 
CMD python wb.py
# Run the flask app
CMD python app.py
