# class A:
#     def __init__(self):
#         self.a = "number"
#         self.b = True
#         self.c = 123456
# def main():
#     import json
#     a = A()
#     print (json.dumps(a, default=lambda obj: obj.__dict__, sort_keys=True, indent=4))

# main()


# import eel
# @eel.expose
# def test_print(str):
    
#     print("进来了",str)
#     test_process(str)  #python 中的处理过程，再调用js中的函数返回
    
    
# def test_process(str):
#     str2 = str+'已处理'
#     eel.system_sends_message2(str2)  # 调用js文件里的函数，将结果返回去

# from django.http import JsonResponse
# # import urllib.response

# def Try(request):
#     # return "a"
#     HttpResponse(request)


    
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/test')
def test_page():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')