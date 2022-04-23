from flask import Flask, Blueprint
from flask_restful import Resource, Api
from script import get_burntout, get_underengaged, get_ryg_breakdown

app = Flask(__name__)
api_v1_bp = Blueprint("api/v1", f"{__name__}/v1", url_prefix="/api/v1")
api = Api(api_v1_bp)


class BurntOutReport(Resource):
    def get(self):
        return get_burntout()

class UnderengagedReport(Resource):
    def get(self):
        return get_underengaged()

class RYGBreakdownReport(Resource):
    def get(self):
        return get_ryg_breakdown()

api.add_resource(BurntOutReport, '/reports/burntout')
api.add_resource(UnderengagedReport, '/reports/underengaged')
api.add_resource(RYGBreakdownReport, '/reports/rygbreakdown')
app.register_blueprint(api_v1_bp)