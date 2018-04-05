import sys
sys.path.append("../spark/python")
sys.path.append("../spark/python/lib/py4j-0.10.4-src.zip")
from pyspark.sql import SparkSession
from pyspark.sql.functions import desc


class ReadFile:

    skill_grouped = 0

    def __init__(self):
        self.spark = SparkSession \
            .builder \
            .appName("Auto team mate") \
            .config("sparkConfig", "local") \
            .getOrCreate()
        self.main()
        self.get_skill_set_with_count()
        self.team_count = 10
        self.columns = ['skill_name', 'teacher_id']

    def main(self):
        self.content = self.spark.read.load('../assets/dataset/skill_builder_data.csv',
                                  format='com.databricks.spark.csv',
                                  header='true',
                                  inferSchema='true')

    def get_skill_set_with_count(self):
        self.content = self.content.dropDuplicates(['teacher_id'])
        grouped_skill = self.content.groupBy('skill_name').count()
        lowest_skills = grouped_skill.sort("count")
        low_json = lowest_skills.toJSON()
        print(low_json.take(5))
        not_null = grouped_skill.na.drop(subset=["skill_name"])
        highest_skills = not_null.sort(desc("count"))
        high_json = highest_skills.toJSON()
        print(high_json.take(5))
        grouped_skill_json = grouped_skill.toJSON()
        print(grouped_skill_json.collect())
        self.spark.stop()

