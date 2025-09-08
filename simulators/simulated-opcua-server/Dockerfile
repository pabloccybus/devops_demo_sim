# Use an official Python runtime as a parent image
FROM python:3.6

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 4840

# Run server.py when the container launches
CMD ["python", "server.py"]

