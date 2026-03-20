import csv
import json
import random
from datetime import datetime, timedelta

def generate_mock_data(num_records=100):
    first_names = ["Rahul", "Amit", "Priya", "Sneha", "Karan", "Rohit", "Anita", "Sunita", "Vikram", "Neha", "Jithender", "Manimala", "Prabh", "Kamini", "Suresh"]
    last_names = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Patel", "Reddy", "Rao", "Prajapathi", "Anjaiah", "Yadav", "Iyer"]
    relations = ["S/o.", "D/o.", "W/o.", "H/o.", "Brother of", "Sister of"]
    districts = ["Hyderabad", "R.R.Dist", "Medchal", "Cyberabad", "Delhi", "Mumbai", "Pune"]
    police_stations = ["Afzalgunj", "Borabanda", "Saroor nagar limits", "Banjara Hills", "Jubilee Hills", "Kukatpally", "Madhapur"]
    languages = [["Hindi"], ["Telugu"], ["English"], ["Hindi", "English"], ["Telugu", "English"], ["Hindi", "Telugu", "English"]]
    mental_health = ["Normal", "Mentally disable", "Alzimer", "Depressed", "Normal"]
    
    # Real links provided by user
    sample_images = [
        "https://unknownbodies.org/wp-content/uploads/shfimages/missings/1773647395.jpg",
        "https://unknownbodies.org/wp-content/uploads/shfimages/missings/1773818238.jpg",
        "https://unknownbodies.org/wp-content/uploads/shfimages/missings/1773578091.jpg",
        "https://unknownbodies.org/wp-content/uploads/shfimages/missings/1773576919.jpg",
        "https://unknownbodies.org/wp-content/uploads/shfimages/missings/1773906260.jpg"
    ]

    dataset = []
    
    # Add exact 5 provided rows first to ensure they are present
    provided = [
        {"Registration Number": "13347", "Name": "Jithender Prajapathi", "Relation": "S/o. Bheraram Prajapathi", "Date Missing From": "01-01-2026", "Last seen": "From home", "mobile numbers": "871266265, 8712660534", "age": "32", "Languages Known": "Hindi, Marwadi", "District": "Hyderabad", "Police Station AreaArea": "Afzalgunj", "Case Registered": "117/2026", "Mental Health Status": "Normal", "Person Image web Link": sample_images[0]},
        {"Registration Number": "13346", "Name": "Manimala", "Relation": "D/o. Thipanna", "Date Missing From": "02-01-2026", "Last seen": "From home", "mobile numbers": "9700760432, 8712665189", "age": "18", "Languages Known": "Telugu, English", "District": "Hyderabad", "Police Station AreaArea": "Borabanda", "Case Registered": "146/2026", "Mental Health Status": "Normal", "Person Image web Link": sample_images[1]},
        {"Registration Number": "13345", "Name": "Prabh Dayal Sharma", "Relation": "S/o. Shanak Sharma", "Date Missing From": "03-01-2026", "Last seen": "From home", "mobile numbers": "97979 46555", "age": "90", "Languages Known": "Hindi", "District": "Hyderabad", "Police Station AreaArea": "Jammu", "Case Registered": "./2026", "Mental Health Status": "Normal", "Person Image web Link": sample_images[2]},
        {"Registration Number": "13344", "Name": "Kamini Anjaiah", "Relation": "S/o. Ramaiah", "Date Missing From": "04-01-2026", "Last seen": "Saroor nagar limits", "mobile numbers": "9908749110, 9391389377", "age": "45", "Languages Known": "Telugu", "District": "R.R.Dist", "Police Station AreaArea": "", "Case Registered": "", "Mental Health Status": "Mentally disable", "Person Image web Link": sample_images[3]},
        {"Registration Number": "13343", "Name": "OO O", "Relation": "O", "Date Missing From": "05-01-2026", "Last seen": "O", "mobile numbers": "0", "age": "72", "Languages Known": "Telugu, Hindi", "District": "Hyderabad", "Police Station AreaArea": "", "Case Registered": "", "Mental Health Status": "Alzimer", "Person Image web Link": sample_images[4]}
    ]
    dataset.extend(provided)
    
    start_date = datetime(2025, 1, 1)
    
    for i in range(5, num_records):
        fname = random.choice(first_names)
        lname = random.choice(last_names)
        rel_fname = random.choice(first_names)
        rel_lname = random.choice(last_names)
        
        reg_num = str(13342 - i + 5)
        name = f"{fname} {lname}"
        relation = f"{random.choice(relations)} {rel_fname} {rel_lname}"
        miss_date = start_date + timedelta(days=random.randint(0, 380))
        date_str = miss_date.strftime("%d-%m-%Y")
        last_seen = random.choice(["From home", "Market", "School", "Railway Station", "Bus Stand"])
        mob = f"9{random.randint(100000000, 999999999)}"
        age = str(random.randint(5, 85))
        langs = ", ".join(random.choice(languages))
        dist = random.choice(districts)
        ps = random.choice(police_stations)
        case_reg = f"{random.randint(10, 500)}/{miss_date.year}"
        health = random.choice(mental_health)
        img_link = random.choice(sample_images) # reuse provided links as placeholders
        
        dataset.append({
            "Registration Number": reg_num,
            "Name": name,
            "Relation": relation,
            "Date Missing From": date_str,
            "Last seen": last_seen,
            "mobile numbers": mob,
            "age": age,
            "Languages Known": langs,
            "District": dist,
            "Police Station AreaArea": ps,
            "Case Registered": case_reg,
            "Mental Health Status": health,
            "Person Image web Link": img_link
        })
        
    return dataset

if __name__ == "__main__":
    data = generate_mock_data(100)
    
    # Save to JSON
    with open("missing_persons.json", "w") as f:
        json.dump(data, f, indent=4)
        
    # Save to CSV
    keys = data[0].keys()
    with open("missing_persons.csv", "w", newline='') as f:
        dict_writer = csv.DictWriter(f, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(data)
        
    print(f"Successfully generated {len(data)} missing persons records.")
