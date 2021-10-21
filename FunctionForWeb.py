from openpyxl.descriptors.base import String
from TreeMap import tree_data_set, set_tree,tree_data_process
from SearchEngine import take_search_result
from openpyxl import  load_workbook
import json
import global_vary

from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)


# @app.route('/')
# @app.route('/index.html')
# def index():
#     return render_template('index.html')


# @app.route('/addnumber')
# @cross_origin()
# def add():
#     a = request.args.get('a', 0, type=float)
#     b = request.args.get('b', 0, type=float)
#     return jsonify(result=a + b)

# # if __name__ == "__main__":
# #     app.run()
# if __name__ == '__main__':
#     # app.run(host="0.0.0.0", port=5000)
#     app.run(host="10.223.186.93", port=5000)

#return格式：list[dic{onename:str,path:str,related_parts:lst[],signi:lst[]},dic{}]
@app.route('/search')
@cross_origin()
def get_Json_searching_data():
    temp = request.args.get('name', 0, type=String)
    target_part = temp.name
    global_vary._init()
    wb = load_workbook('whole_collection_processed.xlsx')
    ws= wb['Sheet1']
    global_vary.set_value('ws', ws)
    search_results = take_search_result(target_part, ws)#需要返回一个strlist
    return jsonify(result=search_results)
    if len(search_results) == 0:
        return 0
    back_lst = []
    for an_result in search_results:
        an_result_dic = {}
        an_result_dic['part_name'] = an_result
        tree_data = tree_data_set(an_result)
        parts_and_significance = tree_data_process(tree_data)
        set_tree(tree_data)
        tree_path = str(an_result) + "tree.html"#path要保存
        an_result_dic['tree_path'] = tree_path
        an_result_dic['related_parts'] = parts_and_significance[0]
        an_result_dic['signif'] = parts_and_significance[1]
        back_lst.append(an_result_dic)
    print(json.dumps(back_lst, indent=4))
    return json.dumps(back_lst, indent=4)

if __name__ == '__main__':
    # app.run(host="10.222.211.44", port=5000)
    app.run(host="127.0.0.1", port=5000)
    # get_Json_searching_data('BBa_I11050')

# main()




#def call_for_blast(target_part):


