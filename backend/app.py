from flask import Flask, abort, jsonify, request
from flask_cors import CORS

from inspector import Inspector

app = Flask(__name__)
CORS(app)



@app.route("/search", methods=["GET"])
def search():
    args = request.args
    restaurant_name = args.get('restaurant_name')
    zipcode = args.get('zipcode')
    cuisine = args.get('cuisine')
    limit = args.get('limit',10,type=int)

    inspections = Inspector.get_inspections()
    response = []
    for inspection in inspections:
        if (restaurant_name and restaurant_name.lower() not in str(inspection.restaurant_name).lower()) or \
        (zipcode and zipcode != inspection.zipcode) or \
        (cuisine and cuisine.lower() not in str(inspection.cuisine).lower()):
            continue
        response.append(inspection.to_json())
            
    sortedRes = sorted(response, key=lambda x: x['restaurant_id'])
    return jsonify({'data':sortedRes[:limit]})
        
if __name__ == "__main__":
    app.run(host="localhost", debug=True, port=8080)

"""
Resources Used:
GETTING ARGUMENTS: 
https://stackoverflow.com/questions/11774265/how-do-you-access-the-query-string-in-flask-routes
https://stackabuse.com/get-request-query-parameters-with-flask/
SORTING LIST OF DICTIONARIES: 
https://pythonhow.com/how/sort-a-list-of-dictionaries-by-a-value-of-the-dictionary/
"""