import sys
import logging
import pymysql
import os
import json
import datetime
import boto3

client = boto3.client('cognito-idp')

#rds settings
rds_host  = os.environ['RDS_HOST']
name = os.environ['NAME']
password = os.environ['PASSWORD']
db_name = os.environ['DB_NAME']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    response = client.verify_software_token(
        AccessToken='string',
        Session='string',
        UserCode='string',
        FriendlyDeviceName='string'
    )
    if not response:
        throw Exception("Session not valid.")
        
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

def defaultconverter(o):
  if isinstance(o, datetime.datetime):
      return o.__str__()

def lambda_handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """

    query_string = event['headers']['query']

    with conn.cursor() as cur:
        cur.execute("SET time_zone = 'America/New_York';")
        escaped_query = query_string.split(";", 1)
        logging.info(escaped_query[0])
        cur.execute(escaped_query[0])
        results = cur.fetchall()
    conn.commit()

    return json.dumps(results, default=defaultconverter)
