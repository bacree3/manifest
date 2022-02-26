import sys
import logging
import pymysql
import os
#rds settings
rds_host  = os.environ['RDS_HOST']
name = os.environ['NAME']
password = os.environ['PASSWORD']
db_name = os.environ['DB_NAME']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """

    query_string = event['headers']['query']

    with conn.cursor() as cur:
        escaped_query = conn.escape_string(query_string)
        cur.execute(escaped_query)
        conn.commit()
        logger.info(cur)
    conn.commit()

    return cur
