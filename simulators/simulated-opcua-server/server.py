from opcua import ua, Server
from datetime import datetime
from time import sleep
import random
from get_public_ip import get_public_ip
import json


def save_data_into_txt(protocol, host, port):
    file_name = "../data.txt"
    with open(file_name, "w") as txt_file:
        txt_file.write(f"Protocol: {protocol}\n\n")
        txt_file.write(f"Host: {host}\n\n")
        txt_file.write(f"Port: {port}\n\n")
        txt_file.write(f"OPC UA - URL: {protocol + '://' + host + ':' + str(port)}\n")

    print(file_name + " was created.")


if __name__ == "__main__":
    """
    Get Public IP
    """
    public_ip = get_public_ip()
    if not public_ip:
        print("Failed to retrieve public IP. Exiting.")
        exit()

    """
    OPC UA Server Modeling
    """
    protocol = "opc.tcp"
    host = public_ip
    port = 4840
    endpoint = protocol + "://" + host + ":" + str(port)

    save_data_into_txt(protocol, host, port)

    # create_file()

    server = Server()

    server.set_endpoint(endpoint)
    servername = "Python-OPC-UA-Server"
    server.set_server_name(servername)

    """
    OPC UA Modeling
    """
    object_node = server.get_objects_node()
    idx = server.register_namespace("OPCUA_SERVER")

    # Creating Factory node
    factory = object_node.add_object(idx, "Factory")
    print("Factory Node ID: ", factory)

    # Adding Building 1 node
    building1 = factory.add_object(idx, "Building_1")
    print("Building 1 Node ID: ", building1)

    # Adding Machine 1: RoboAssembler 5000
    machine1 = building1.add_object(idx, "RoboAssembler_5000")
    print("Machine 1 Node ID: ", machine1)

    # Adding Device 1: RoboVision Sensor
    robovision_sensor = machine1.add_object(idx, "RoboVision_Sensor")
    print("RoboVision Sensor Node ID: ", robovision_sensor)

    # Adding Value 1: RoboVision Sensor Temperature
    temperature_robovision = robovision_sensor.add_variable(idx, "Temperature", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Temperature Node ID: ", temperature_robovision)

    # Adding Value 2: RoboVision Sensor Timestamp
    timestamp_robovision = robovision_sensor.add_variable(idx, "Timestamp", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Timestamp Node ID: ", timestamp_robovision)

    # Adding Value 3: RoboVision Sensor State
    state_robovision = robovision_sensor.add_variable(idx, "State", 0.0, ua.VariantType.Boolean)
    print("RoboVision Sensor Timestamp Node ID: ", state_robovision)

    # Adding Device 2: RoboArm Manipulator
    roboarm_manipulator = machine1.add_object(idx, "RoboArm_Manipulator")
    print("RoboArm Manipulator Node ID: ", roboarm_manipulator)

    # Adding Value 1: RoboArm Manipulator
    temperature_roboarm = roboarm_manipulator.add_variable(idx, "Temperature", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Temperature Node ID: ", temperature_robovision)

    # Adding Value 2: RoboArm Manipulator
    timestamp_roboarm = roboarm_manipulator.add_variable(idx, "Timestamp", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Timestamp Node ID: ", timestamp_robovision)

    # Adding Value 3: RoboArm Manipulator
    position_roboarm = roboarm_manipulator.add_variable(idx, "Position", 0.0, ua.VariantType.String)
    print("RoboVision Sensor Timestamp Node ID: ", position_roboarm)


    ########################################################################
    # Adding Building 2 node
    building2 = factory.add_object(idx, "Building_2")
    print("Building 2 Node ID: ", building2)

    # Adding Machine 1: TurboPress 8000
    machine2 = building2.add_object(idx, "TurboPress_8000")
    print("Machine 2 Node ID: ", machine2)

    # Adding Device 1: Hydraulic Pump
    hydraulic_pump = machine2.add_object(idx, "Hydraulic_Pump")
    print("Hydraulic Pump Node ID: ", hydraulic_pump)

    # Adding Value 1: Pressure Gauge
    pressure_gauge = hydraulic_pump.add_variable(idx, "Pressure", 0, ua.VariantType.Float)
    print("Pressure Gauge Node ID: ", pressure_gauge)

    # Adding Value 2: RoboVision Sensor Temperature
    temperature_gauge = hydraulic_pump.add_variable(idx, "Temperature", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Temperature Node ID: ", temperature_gauge)

    # Adding Value 3: RoboVision Sensor Timestamp
    timestamp_gauge = hydraulic_pump.add_variable(idx, "Timestamp", 0.0, ua.VariantType.Float)
    print("RoboVision Sensor Timestamp Node ID: ", timestamp_gauge)


    # Starting OPC-UA Server
    server.start()

    """
    OPC-UA-Server set values
    """
    try:
        i = 0
        while True:
            # Update Variable of Machine 1 Roboarm Manipulator

            ###### Update Variable of Device 1 Robovision Sensor

            timestamp_robovision.set_value(datetime.now(), ua.VariantType.DateTime)
            temperature_robovision.set_value(random.uniform(20, 20.9), ua.VariantType.Float)
            state_robovision.set_value(random.uniform(True, False), ua.VariantType.Boolean)

            ####### Update Variable of Device 2 Roboarm Manipulator
            x_range = (0, 1000)
            y_range = (0, 1000)
            z_range = (0, 1000)

            # Generate random values for each coordinate
            x_coord = random.uniform(*x_range)
            y_coord = random.uniform(*y_range)
            z_coord = random.uniform(*z_range)

            # Set the generated coordinates into the roboarm_manipulator as a list
            coordinates = [x_coord, y_coord, z_coord]
            coordinates_json = json.dumps(coordinates)

            # Set the JSON string as the value for roboarm_manipulator
            position_roboarm.set_value(coordinates_json, ua.VariantType.String)
            timestamp_roboarm.set_value(datetime.now(), ua.VariantType.DateTime)
            temperature_roboarm.set_value(random.uniform(20, 20.9), ua.VariantType.Float)


            ####### Update Variable of Machine 2 TurboPress_8000
            # Update Variable of Device 1 Gauge

            pressure_gauge.set_value(random.uniform(2.3, 2.6), ua.VariantType.Float)
            temperature_gauge.set_value(random.uniform(20, 20.9), ua.VariantType.Float)
            timestamp_gauge.set_value(datetime.now(), ua.VariantType.DateTime)

            sleep(1)
            i += 1
    except KeyboardInterrupt:
        server.stop()
