import csv
from pprint import pprint
from datetime import datetime
from statistics import mean

users = {
 'U018ZAT6MR7',
 'U01URC62FJL',
 'U022ZAGPHU1',
 'U02EZK58CMQ',
 'U02SGN4NB9S',
 'U02UB0BTJES',
 'U030JSMDTND',
 'U033XN5SL8J',
 'UQ3QMNZ4M',
 'UQ5L65QKZ',
 'UQ6157D2S'
 }

names = {
 'U018ZAT6MR7': 'Vinny Testaverde',
 'U01URC62FJL': 'William J. Fakington',
 'U022ZAGPHU1': 'M. Naught Real',
 'U02EZK58CMQ': 'Johnny Test',
 'U02SGN4NB9S': 'Test Testerino',
 'U02UB0BTJES': 'Lassie Collie',
 'U030JSMDTND': 'Sparky Pug',
 'U033XN5SL8J': 'Lester Testington',
 'UQ3QMNZ4M': 'Fester Testington',
 'UQ5L65QKZ': 'Jester Testington',
 'UQ6157D2S': 'Blester Testington',
 }

teams = {'U01URC62FJL&0',
 'U02EZK58CMQ&0',
 'U02SGN4NB9S&0',
 'U02UB0BTJES&0',
 'UQ3QMNZ4M&0',
 'UQ3QMNZ4M&1',
 'UQ5L65QKZ&0',
 'UQ5L65QKZ&1',
 'UQ5L65QKZ&2',
 'UQ6157D2S&0'}

membership = {'U01URC62FJL&0': {'UQ3QMNZ4M', 'U01URC62FJL'},
 'U02EZK58CMQ&0': {'U02EZK58CMQ', 'UQ6157D2S'},
 'U02SGN4NB9S&0': {'UQ3QMNZ4M', 'U02SGN4NB9S', 'UQ5L65QKZ'},
 'U02UB0BTJES&0': {'U02UB0BTJES'},
 'UQ3QMNZ4M&0': {'U01URC62FJL',
                 'U022ZAGPHU1',
                 'U02EZK58CMQ',
                 'U02SGN4NB9S',
                 'U02UB0BTJES',
                 'U030JSMDTND',
                 'U033XN5SL8J',
                 'UQ3QMNZ4M',
                 'UQ5L65QKZ',
                 'UQ6157D2S'},
 'UQ3QMNZ4M&1': {'U01URC62FJL',
                 'U022ZAGPHU1',
                 'U02SGN4NB9S',
                 'UQ3QMNZ4M',
                 'UQ5L65QKZ'},
 'UQ5L65QKZ&0': {'UQ3QMNZ4M', 'UQ6157D2S', 'UQ5L65QKZ'},
 'UQ5L65QKZ&1': {'UQ3QMNZ4M', 'UQ6157D2S', 'UQ5L65QKZ'},
 'UQ5L65QKZ&2': {'UQ3QMNZ4M', 'U018ZAT6MR7', 'UQ6157D2S', 'UQ5L65QKZ'},
 'UQ6157D2S&0': {'UQ6157D2S', 'UQ5L65QKZ'}}

team_sizes = {team: len(users) for team, users in membership.items()}

def get_raw_data():
    with open('rygs.csv') as f:
        raw = [{k: v for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)]
    return raw

def get_users():
    raw = get_raw_data()
    users = set()
    for row in raw:
        users.add(row['SlackUserId'])
    return users

def get_teams():
    raw = get_raw_data()
    teams = set()
    for row in raw:
        teams.add(row['SlackTeamId'])
    return teams

def get_membership():
    with open('rygs.csv') as f:
        raw = [{k: v for k, v in row.items()}
        for row in csv.DictReader(f, skipinitialspace=True)]
        membership = {}
        for team in teams:
            membership[team] = set()
        for row in raw:
            team = row['SlackTeamId']
            user = row['SlackUserId']
            membership[team].add(user)
        return membership

def timestamp_string_to_date_string(timestamp_string):
    timestamp = int(float(timestamp_string))
    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime('%m-%d-%y')

def get_daily_engagement():
    data = get_raw_data()
    checked_in = {team: {} for team in teams}
    first_day = timestamp_string_to_date_string(data[0]['Timestamp'])
    for row in data:
        team = row['SlackTeamId']
        user = row['SlackUserId']
        date_string = timestamp_string_to_date_string(row['Timestamp'])
        previous = checked_in[team].get(date_string, 0)
        checked_in[team][date_string] = previous + 1
    return checked_in

def get_daily_reds():
    data = get_raw_data()
    checked_in = {team: {} for team in teams}
    first_day = timestamp_string_to_date_string(data[0]['Timestamp'])
    for row in data:
        team = row['SlackTeamId']
        user = row['SlackUserId']
        selection = row['Selection']
        date_string = timestamp_string_to_date_string(row['Timestamp'])
        previous = checked_in[team].get(date_string, 0)
        if selection == 'red':
            checked_in[team][date_string] = previous + 1
    return checked_in

def get_average_metric(daily_by_team):
    average_by_team = {}
    for team, value_per_day in daily_by_team.items():
        # TODO (akv): this 
        total = [v for v in value_per_day.values()]
        average_by_team[team] = mean(total)
    return average_by_team

def get_ratio(average_by_team):
    ratio_per_team = {}
    for team, average in average_by_team.items():
        ratio_per_team[team] = average / team_sizes[team]
    return ratio_per_team

def serialize_table(ratios):
    sorted_ratios = sorted(ratios, key=lambda x: x[1])
    result = [{"name": names[team_id[:-2]], "rate": rate} for (team_id, rate) in sorted_ratios]
    return result

def get_underengaged():
    ratios = get_ratio(get_average_metric(get_daily_engagement())).items()
    return serialize_table(ratios)

def get_burntout():
    ratios = get_ratio(get_average_metric(get_daily_reds())).items()
    return serialize_table(ratios)
