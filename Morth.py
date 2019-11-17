from flask import Flask,g,request
from flask_restful import Api,Resource
from flask_cors import CORS

import matplotlib.pyplot as plt
import seaborn as sns
from random import uniform, shuffle
import os
import pandas as pd
import numpy as np
import pandas as pd
import time
from ast import literal_eval as lit
import nltk
import gensim
from collections import defaultdict

app=Flask(__name__)
app.secret_key="Tough Key"
CORS(app)
api=Api(app)

def get_reports(df):
    places = list(set([item for item in df['Place_Of_Missing']]))
    print (places)
    return places

def search_data(arr):
    mydict2=defaultdict(list)
    try :
        from googlesearch import search
        res = ['No','Yes']
        cause = ['wet road','under construction','jay walking','driver fault']
        injury = ['minor','major','immediate attention']
        for i in range(1):
            print (arr[i])
            mydict2['location']=arr[i]
            query = arr[i]+"road conditions google maps"
            weather = arr[i]+"current weather accuweather"
            traffic = arr[i]+"current traffic map"
            intensity = "Common Injury Type : {}\nMajor Cause: {}\nPolice On Duty: {}".format(injury[g.df['Injury_type'][i]%3], cause[g.df['Major_Cause'][i]], res[g.df['IsPoliceOnDuty'][i]])
            for j in search(query, tld="com", num=1, stop=1, pause=5):
                print ("Road conditions : ",j)
                mydict2['Road condition']=j
                mydict2['Intensity']=intensity
                print (intensity)
            for k in search(weather, tld="com", num=1, stop=1, pause=5):
                print ("Weather conditions : ",k)
                mydict2['Weather conditions']=k
            for l in search(traffic, tld="com", num=1, stop=1, pause=5):
                print ("Traffic conditions : ",l)
                mydict2['Traffic conditions']=l
            print ("\n")
    except Exception as e:
        print(e)
        pass
    return mydict2

def basic_analysis(filename='processed_df_accident_data.csv'):
    mydict={}
    a_df = pd.read_csv(filename)
    head_injury, helmet = 0,0
    for item in a_df['Head_Injury']:
        if item!=0:
            head_injury +=1
    for item in a_df['Helmet']:
        if item!=0:
            helmet+=1
    print ("Head injury, 2 wheelers :",float(head_injury)*100/float(helmet),"%")
    mydict.update({"Head injury, 2 wheelers":float(head_injury)*100/float(helmet)})
    sev, injury = 0,0
    minor, med = 0,0
    for item in a_df['Injury_Type']:
        if item==4:
            sev+=1
        elif item==3:
            med+=1
        elif item==2:
            minor+=1
        elif item!=0:
            injury +=1
    #print ("Severe injuries :{}%").format(float(sev)*100/float(injury))
    #print ("Moderate injuries {}%").format(float(med)*100/float(injury))
    #print ("Minor injuries :{}%").format(float(minor)*100/float(injury))
    #print ("Head injury of all injuries : {}%").format(float(head_injury)*100/float(injury))
    mydict.update({"Severe injuries":float(sev)*100/float(injury)})
    mydict.update({"Moderate injuries":float(med)*100/float(injury)})
    mydict.update({"Minor injuries":float(minor)*100/float(injury)})
    mydict.update({"Head injury of all injuries":float(head_injury)*100/float(injury)})
    hosp,req = 0,0
    a_df['Hospital_Name']= a_df['Hospital_Name'].fillna('empty')
    
    for item in a_df['Hospital_Name']:
        if item!='empty':
            hosp+=1
        req+=1
    #print ("On average, {}% rushed to hospital on accident").format(float(hosp)*100/float(req))
    mydict.update({"On average,rushed to hospital":float(hosp)*100/float(req)})
    return mydict

def highest_probas(month, limit=5):
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    params = ['Alcohol_drugs', 'Wet_Road','Construction','Rain','Traffic','Narrow_Road','Pot_holes',
              'Driver_Fault','Bad_lighting','bad_vehicle_gear']
    shuffle(params)
    probas = [uniform(0,1) for i in range(len(params))]
    logits = sum(probas)
    soft_thresh=[float(probas[i])/float(logits) for i in range(len(params))]
    idx = months.index(month)
#     print month, idx
    list_max = []
    for p in params:
        inner,val = [],0
        for i in range(1,limit+1):
            inner.append(params[limit%i])
            val+=soft_thresh[params.index(params[limit%i])]
            params.pop(params.index(params[limit%i])) #nonrepeating factor
        list_max.append([val, inner])
#         print inner
    
    return sorted(list_max)[0]

@app.before_request
def before_req():
    g.df=pd.read_csv('Victim_Info_Unique.csv')

@app.teardown_request
def teardown_req(error=None):
    g.df=pd.read_csv('Victim_Info_Unique.csv')

class BasicAnalysis(Resource):
    def get(self):
        result=basic_analysis()
        return result

class ReportData(Resource):
    def post(self):
        places = get_reports(g.df)
        result=search_data(places)
        return result

class Highest(Resource):
    def post(self):
        data=request.json
        mon=data['mon']
        limit=int(data['limit'])
        result=highest_probas(mon,limit)
        return {'result':result}

api.add_resource(BasicAnalysis,'/basicAnalysis')
api.add_resource(ReportData,'/reportData')
api.add_resource(Highest,'/highest')

if(__name__=='__main__'):
    app.run(debug=True)