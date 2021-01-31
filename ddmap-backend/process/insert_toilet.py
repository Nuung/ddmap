import datetime # for get now time
import pytz
import json
from pprint import pprint

if __name__ == "__main__":

    now = datetime.datetime.now(tz=pytz.utc)
    nowDate = now.strftime('%Y-%m-%d')

    toilet_model = {
        "id": "",
        "name": "",
        "latitude": "",
        "longitude": "",
        "image": "",
        "goo_name": "",
        "dong_name": "",
        "street_num_main": "",
        "street_num_sub": "",
        "detail": "",
        "createdAt": "",
        "updatedAt": ""
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

        for record in records:
            try:
                address = record['소재지도로명주소'].split(" ")
                if record['위도'] or record['경도']:
                    print(record['화장실명'], record['위도'], record['경도'], " ".join(address[:2]), address[2], address[3], "".join(address[4:]), record['데이터기준일자'], nowDate)
            except Exception:
                continue
            