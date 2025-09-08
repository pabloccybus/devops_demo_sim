import socket
def get_public_ip():
    try:
        # Create a socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        # Connect to a remote server (doesn't send any data)
        sock.connect(("8.8.8.8", 80))  # Google's public DNS server

        # Get the socket's local address, which should be your public IP
        public_ip = sock.getsockname()[0]
        print("Your public IPv4 address is:", public_ip)
        return public_ip
    except Exception as e:
        print("Error:", e)
        return None