from django.shortcuts import render
from .models import User
from django.db.models import Q
from rest_framework import generics
from .serializer import UserSerializer
from django.http.response import HttpResponse
from django.db.models import F
from django.http import JsonResponse  # json형식으로 반환
import os
from neo4j import GraphDatabase
from rest_framework.decorators import api_view
from rest_framework.response import Response


def home1(request):
    return render(request, 'folder/base.html')


gen = ["남성", "여성", "공용", "성별테스트"]
color = ["빨강", "파랑", "노랑", "청색", "흰색", "검은색", "회색", "색깔테스트"]
part = ["상의", "하의", "신발", "모자", "아우터", "부위테스트"]
season = ["봄", "여름", "가을", "겨울", "계절테스트"]
brand = ["보세", "뉴발란스", "지프", "나이키", "벨벳", "라코스테", "아디다스", "폴로", "게스", "브랜드테스트"]
price = int


def createform(request):
    query = request.POST.getlist('query[]')
    button_value = request.POST.get('button')

    print(query)

    gdbsearch = 0
    input1 = None
    input2 = None
    input3 = None
    input4 = None
    input5 = None
    input6 = 0
    input8 = []  # 태그

    for q in query:
        if q == '남성' or q == '남자':
            input1 = '남성'
        elif q == '여성' or q == '여자':
            input1 = '여성'
        elif q == '공용':
            input1 = '공용'
        elif q in part:
            input2 = q
        elif q in color:
            input3 = q
        elif q in season:
            input4 = q
        elif q in brand:
            input5 = q
        elif q.isdigit():
            print(type(q))
            input6 = q
            min = int(q)-5000
            max = int(q)+5000
            print(q, min, max)
            # input6 = q
        else:
            input8.append(q)

    input8 = list(set(input8))

    filters = Q()
    if input1:
        filters &= Q(gender__icontains=input1)
        print("Filter gender:", filters)
    if input2:
        filters &= Q(part__icontains=input2)
    if input3:
        filters &= Q(color__icontains=input3)
    if input4:
        filters &= Q(season__icontains=input4)
    if input5:
        filters &= Q(brand__icontains=input5)
    if input6:
        filters &= Q(price__lte=max) & Q(price__gte=min)
    if input8:
        for q in input8:
            users = User.objects.filter(tag__icontains=q)
            users.update(score=F('score') + 1)

        filters |= Q(tag__icontains=input8)

    users = User.objects.filter(filters).order_by('-score')
    serializer = UserSerializer(users, many=True)

    datasearch = serializer.data

    first_result = serializer.data[0]
    gdbsearch = first_result['id']  # gdb서치용

    users.update(score=0)

    driver = GraphDatabase.driver(
        'bolt://localhost:7687', auth=('neo4j', '12345678'))
    session = driver.session()

    q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch)
    results = session.run(q)
    result = list(results)

    names = [record.get('m.name') for record in result]

    usersnewbie = User.objects.filter(id__in=names)
    serializernewbie = UserSerializer(usersnewbie, many=True)

    dataexpert = datasearch + serializernewbie.data

    users1 = User.objects.filter(id__in=names, part__icontains="상의")[
        :1]  # 1개 넣은건 newbie용 확인용 나중에 3으로 교체
    users2 = User.objects.filter(id__in=names, part__icontains="하의")[:1]
    users3 = User.objects.filter(id__in=names, part__icontains="신발")[:1]
    users4 = User.objects.filter(id__in=names, part__icontains="모자")[:1]

    serializer1 = UserSerializer(users1, many=True)
    serializer2 = UserSerializer(users2, many=True)
    serializer3 = UserSerializer(users3, many=True)
    serializer4 = UserSerializer(users4, many=True)

    datanewbie = datasearch + serializer1.data + \
        serializer2.data + serializer3.data + serializer4.data

    if button_value == 'E':   # expert
        return render(request, 'folder/searchreal.html', {'users': dataexpert})
    elif button_value == 'S':   # search
        return render(request, 'folder/searchreal.html', {'users': datasearch})
    else:       # 아무것도 안누르면 newbie가 기본값
        return render(request, 'folder/searchreal.html', {'users': datanewbie})

    # part_list = ["상의", "하의", "신발", "모자"]
    # for part1 in part_list:
    # users1 = User.objects.filter(id__in=names, part__icontains=part1)[:1]
    # serializer = UserSerializer(users1, many=True)
    # data += serializer.data

    # return JsonResponse({'users': data}) 나중에 json 값으로 바꿔서 프론트에 보내야함


def other(request):

    driver = GraphDatabase.driver(
        'bolt://localhost:7687', auth=('neo4j', '12345678'))
    session = driver.session()

    # gdbsearch.txt 파일에서 gdbsearch 값을 읽어옴
    with open(os.path.join(os.path.dirname(__file__), 'gdbsearch.txt'), 'r') as f:
        gdbsearch = f.read().strip()

    q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch)
    results = session.run(q)
    result = list(results)

    names = [record.get('m.name') for record in result]
    # print(names)

    users = User.objects.filter(id__in=names)
    serializer = UserSerializer(users, many=True)
    data = serializer.data

    return render(request, 'folder/search2.html', {'users': data})


def search_view(request):
    users = User.objects.all()
    return render(request, 'folder/search.html', {'users': UserSerializer(users, many=True)})


class UserListsCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def createform1(request):  # 리액트용
    if request.method == 'POST':
        # data = json.loads(request.body)
        # query = data.get("query")
        query_data = request.POST.getlist('query')

        print(query_data)

        aaa = User.objects.all()
        aaa.update(score=0)

        query1 = []
        for item in query_data:
            query1.extend(item.split(','))

        print(query1)

        gdbsearch = 0
        input1 = None
        input2 = None
        input3 = None
        input4 = None
        input5 = None
        input6 = 0
        input8 = []  # 태그

        for q in query1:
            if q == '남성' or q == '남자':
                input1 = '남성'
            elif q == '여성' or q == '여자':
                input1 = '여성'
            elif q == '공용':
                input1 = '공용'
            elif q == '성별테스트':
                input1 = '성별테스트'
            # elif q in gen:
                # input1 = q
            elif q in part:
                input2 = q
            elif q in color:
                input3 = q
            elif q in season:
                input4 = q
            elif q in brand:
                input5 = q
            elif q.isdigit():
                input6 = q
            else:
                input8.append(q)

        print(input1, input2, input4, input8)

        input8 = list(set(input8))

        filters = Q()
        if input1:
            filters &= Q(gender__icontains=input1)
        if input2:
            filters &= Q(part__icontains=input2)
        if input3:
            filters &= Q(color__icontains=input3)
        if input4:
            filters &= Q(season__icontains=input4)
        if input5:
            filters &= Q(brand__icontains=input5)
        if input6:
            filters &= Q(price__lte=input6)
        if input8:
            for q in input8:
                users = User.objects.filter(tag__icontains=q)
                users.update(score=F('score') + 1)

            filters |= Q(tag__icontains=input8)
            print(filters)
            print(User.objects.all())

        users = User.objects.filter(filters).order_by('-score')
        print(filters)
        serializer = UserSerializer(users, many=True)

        data = serializer.data

        first_result = serializer.data[0]
        gdbsearch = first_result['id']  # gdb서치용
        print(gdbsearch)

        # users.update(score=0) #그냥 처음 불러올때 초기화 하는게 나을지도?

        driver = GraphDatabase.driver(
            'bolt://localhost:7687', auth=('neo4j', '12345678'))
        session = driver.session()

        q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (gdbsearch)
        results = session.run(q)
        result = list(results)

        names = [record.get('m.name') for record in result]

        users1 = User.objects.filter(id__in=names)
        serializer1 = UserSerializer(users1, many=True)

        data1 = serializer1.data

        dataa = data + data1

        return JsonResponse({'users': dataa})

    else:
        return JsonResponse({'result': 'error', 'message': 'Invalid request method'})


@api_view(['POST'])
def inter(request):  # 리액트용
    if request.method == 'POST':
        interid = request.data.get('userId')
        print(interid)

        driver = GraphDatabase.driver(
            'bolt://localhost:7687', auth=('neo4j', '12345678'))
        session = driver.session()

        q = 'match (n:ID {name:%s})-[w:SET]->(m:ID) return m.name' % (interid)
        results = session.run(q)
        result = list(results)

        names = [record.get('m.name') for record in result]

        print(names)

        users1 = User.objects.filter(id__in=names)
        serializer1 = UserSerializer(users1, many=True)

        data1 = serializer1.data  # 추천 상품 출력할때 어떻게 출력할건지 정해야함

        return JsonResponse({'users': data1})
    else:
        return JsonResponse({'result': 'error', 'message': 'Invalid request method'})
