import csv
import json
from pprint import pprint 

with open('restaurants_list.json', encoding='utf8') as fd:
    data = json.load(fd)

rs = {}
validPayment = {"AMEX", "Discover", "MasterCard", "Visa", "Diners Club", "Carte Blanche"}
# objectID;food_type;stars_count;reviews_count;neighborhood;phone_number;price_range;dining_style
with open('restaurants_info.csv') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=';')
    for row in reader:
       rs[row['objectID']] = [('Food Type', row['food_type']),
                              ('Stars', row['stars_count']), 
                              ('reviews_count', row['reviews_count']), 
                              ('neighborhood', row['neighborhood']),
                              ('phone_number', row['phone_number']),
                              ('price_range', row['price_range']),
                              ('dining_style', row['dining_style'])]
        
for obj in data:
    objID = str(obj['objectID'])

    payOpts = list(obj['payment_options'])
    for paymentOpt in payOpts:
        if paymentOpt not in validPayment:
            payOpts.remove(paymentOpt)
    obj['payment_options'] = payOpts
    obj['Payment Options'] = obj.pop('payment_options')

    if objID in rs:
        extraInfo = list(rs[objID])
        for item in extraInfo:
            obj[str(item[0])] = str(item[1])

with open('final_restaurant_info.json', 'w') as fout:
    json.dump(data, fout)