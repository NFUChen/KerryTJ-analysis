from flask import Flask, request
from flask_cors import CORS
from customer_info_locator import CustomerInfoLocator

locator = CustomerInfoLocator("/shipment/shipment_*")
locator.keep_update()
app = Flask(__name__)
CORS(app)

@app.route("/valid_durations", methods=["GET"])
def get_valid_durations():
    return {
        "durations": locator.get_valid_durations()
    }, 200

@app.route("/report", methods=["POST"])
def get_report():
    durations = request.get_json()["durations"]
    if len(durations) == 0:
        return {
            "report": []
        }, 200
    duration_list = []
    for duration_dict in durations:
        year = int(duration_dict["year"])
        month = int(duration_dict["month"])
        duration_list.append(
            (year, month)
        )
    return {
        "report": locator.locate_based_on_year_month(duration_list)
    }, 200 # for testing 



if __name__ == "__main__":
    app.run(host="0.0.0.0", port= 8080)