# Use the official Python image
FROM python:3

# Set the working directory in the container
WORKDIR /app/backend

# Copy the dependencies file to the working directory
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Run the flask app
CMD ["python", "app.py"]
