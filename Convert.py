import pandas as pd
import json

# Glasdoor Columns
glassdoorColumns = [
    "job.listingId.long",
    "benefits.comments",
    "reviews",
    "salary.salaries",
    "overview.competitors",
    "benefits.benefitRatingDecimal",
    "header.applyUrl",
    "benefits.numRatings",
    "header.employerId",
    "header.employerName",
    "header.jobTitle",
    "header.location",
    "header.posted",
    "job.description",
    "map.country",
    "overview.sector",
    "overview.size",
    "overview.type"
]

# Reviews Columns
glassdoorReviewsColumns = [
    "index",
    "id",
    "reviews.val.date",
    "reviews.val.id",
    "reviews.val.publisher",
    "reviews.val.reviewRatings.careerOpportunities",
    "reviews.val.reviewRatings.compBenefits",
    "reviews.val.reviewRatings.cultureValues",
    "reviews.val.reviewRatings.overall",
    "reviews.val.reviewRatings.seniorManagement",
    "reviews.val.reviewRatings.worklifeBalance",
    "reviews.val.reviewerDuration",
    "reviews.val.reviewerJobTitle",
    "reviews.val.reviewerLocation",
    "reviews.val.reviewerStatus",
    "reviews.val.title"
]

# Overview Columns
glassdoorOverviewColumns = [
    "index",
    "id",
    "overview.competitors.val"
]

# Benefits Columns
glassdoorBenefitsColumns = [
    "index",
    "id",
    "benefits.comments.val.city",
    "benefits.comments.val.comment",
    "benefits.comments.val.createDate",
    "benefits.comments.val.currentJob",
    "benefits.comments.val.jobTitle",
    "benefits.comments.val.rating",
    "benefits.comments.val.state"
]

# Salary Columns
glassdoorSalaryColumns = [
    "index",
    "id",
    "salary.salaries.val.basePayCount",
    "salary.salaries.val.jobTitle",
    "salary.salaries.val.payPeriod",
    "salary.salaries.val.salaryPercentileMap.payPercentile10",
    "salary.salaries.val.salaryPercentileMap.payPercentile90",
    "salary.salaries.val.salaryPercentileMap.payPercentile50",
    "salary.salaries.val.salaryType"
]

# Rename columns to replcae . to _
def Rename(df,columns):
    memo = {}
    for column in columns:
        memo[column] = column.replace(".","_")
    return df.rename(memo,axis=1)

# Convert data to dict for faster searching
def IndextoDict(columnName):
    Index = NewGlassdoor[[columnName]]
    Index[columnName] = Index[columnName].fillna(0).astype(int)
    Index.reset_index(level=0, inplace=True)
    Index = Index.set_index(columnName)
    Index
    return Index.to_dict()

# Merge all table to glassdoor
def FormatGlassdoor(dataset, keyDataset, column):
    result = dataset.to_json(orient="records")
    jsonDataset = json.loads(result)
    for row in jsonDataset:
        try:
            id = row['id']
            if id != None:
                index = keyDataset['index'][int(id)]
                if not isinstance(glassdoorJson[index][column], list):
                    glassdoorJson[index][column] = []
                glassdoorJson[index][column].append(row)
        except:
            pass

# Retrieve datasets
glassdoor = pd.read_csv("./datasets/glassdoor.csv",sep=",")
glassdoorReviews = pd.read_csv("./datasets/glassdoor_reviews.csv",sep=",")
glassdoorSalary = pd.read_csv("./datasets/glassdoor_salary_salaries.csv",sep=",")
glassdoorBenefits = pd.read_csv("./datasets/glassdoor_benefits_comments.csv",sep=",")
glassdoorOverview = pd.read_csv("./datasets/glassdoor_overview_competitors.csv",sep=",")

# Keep only specific columns
NewGlassdoor = glassdoor[glassdoorColumns]
newGlassdoorSalary = glassdoorSalary[glassdoorSalaryColumns]
newGlassdoorReviews = glassdoorReviews[glassdoorReviewsColumns]
newGlassdoorBenefits = glassdoorBenefits[glassdoorBenefitsColumns]
newGlassdoorOverview = glassdoorOverview[glassdoorOverviewColumns]

# Remove . from columns names
NewGlassdoor = Rename(NewGlassdoor,glassdoorColumns)
newGlassdoorSalary = Rename(newGlassdoorSalary,glassdoorSalaryColumns)
newGlassdoorReviews = Rename(newGlassdoorReviews,glassdoorReviewsColumns)
newGlassdoorBenefits = Rename(newGlassdoorBenefits,glassdoorBenefitsColumns)
newGlassdoorOverview = Rename(newGlassdoorOverview,glassdoorOverviewColumns)

# Create dict of values
salaryDict = IndextoDict('salary_salaries')
reviewsDict = IndextoDict('reviews')
benefitsDict = IndextoDict('benefits_comments')
overviewDict = IndextoDict('overview_competitors')

# Convert to json
result = NewGlassdoor.to_json(orient="records")
glassdoorJson = json.loads(result)

# Merge all tables to glassdoor
FormatGlassdoor(newGlassdoorSalary,salaryDict,'salary_salaries')
FormatGlassdoor(newGlassdoorReviews,reviewsDict,'reviews')
FormatGlassdoor(newGlassdoorOverview,overviewDict,'overview_competitors')
FormatGlassdoor(newGlassdoorBenefits,benefitsDict,'benefits_comments')

# Write JSON file
with open('data.json', 'w') as fp:
    json.dump(glassdoorJson, fp)