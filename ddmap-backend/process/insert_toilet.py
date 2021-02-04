import requests  # for Toilet Api
import datetime  # for get now time
import random
import pytz
import json
from time import sleep
from pprint import pprint


if __name__ == "__main__":
    # config
    now = datetime.datetime.now(tz=pytz.utc)
    nowDate = now.strftime('%Y-%m-%d')
    headers = {
        'Content-Type': "application/json",
        'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MTIzIiwiaWF0IjoxNjEyMTEyNDg1LCJleHAiOjE2NDM2NDg0ODUsImlzcyI6ImRkbWFwIn0.Uqdid9le8NvcOzDCEPWvl5eotr4pd9RZuvISHskb-R4"
    }

    with open('./datas/전국공중화장실표준데이터.json') as json_file:
        json_data = json.load(json_file)
        columns = json_data['fields']
        records = json_data['records']

        ''' null 값은 아예 빼놔서 try catch
        [{'id': '구분'}, {'id': '화장실명'}, {'id': '소재지도로명주소'}, {'id': '소재지지번주소'}, 
        {'id': '남녀공용화장실여부'}, {'id': '남성용-대변기수'}, {'id': '남성용-소변기수'}, 
        {'id': '남성용-장애인용대변기수'}, {'id': '남성용-장애인용소변기수'}, {'id': '남성용-어린이용대변기수'}, 
        {'id': '남성용-어린이용소변기수'}, {'id': '여성용-대변기수'}, {'id': '여성용-장애인용대변기수'}, 
        {'id': '여성용-어린이용대변기수'}, {'id': '관리기관명'}, {'id': '전화번호'}, {'id': '개방시간'}, 
        {'id': '설치년도'}, {'id': '위도'}, {'id': '경도'}, {'id': '화장실소유구분'}, 
        {'id': '화장실설치장소유형'}, {'id': '오물처리방식'}, {'id': '비상벨설치유형'}, 
        {'id': '화장실입구CCTV설치유무'}, {'id': '기저귀교환대장소'}, {'id': '리모델링년월'}, {'id': '데이터기준일자'}, 
        {'id': '제공기관코드'}, {'id': '제공기관명'}]
        '''

        counter = 0
        req_arr = []
        for record in records:
            try:
                address_new = record['소재지도로명주소'].split(" ")
                address_old = record['소재지지번주소'].split(" ")
                if (record['위도'] or record['경도']) and (address_new[0] in ["서울", "서울 특별시", "서울특별시", "경기도", "경기"]):
                    body = {
                        "id": f"admin{random.uniform(100000000, 200000000)}",
                        "name": record['화장실명'],
                        "open_time": record['개방시간'],
                        "sex": (0 if record['남녀공용화장실여부'] == 'N' else 2),
                        "latitude": record['위도'],
                        "longitude": record['경도'],
                        "image": "",
                        "city_name": address_new[0],
                        "goo_name": address_new[1],
                        "dong_name": address_old[2],
                        "street_name": address_new[2],
                        "street_num_main": address_new[3],
                        "street_num_sub": " ".join(address_old[3:]),
                        "detail": f"전국공중화장실표준데이터{record['데이터기준일자']}",
                    }

                    requests.request("POST", "http://49.247.0.135:443/toilet", data=json.dumps(body), headers=headers)
                    sleep(0.1)
                    req_arr.append(body)
                    counter += 1
            except Exception as e:
                continue

        # print(req_arr)
        print(counter)
