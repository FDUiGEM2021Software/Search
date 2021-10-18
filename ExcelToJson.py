import json
import openpyxl

class Part:
    # part_num(BBa.), part_name(CAP), part_id(内部代码), part_type(com/pro...),star（包含队伍使用和独特的标记)
    def __init__(self, part_num, part_name, part_id, part_url,
                 short_desc, part_type, team, year, sequence, contents,
                 stars, assemble_std, linking_parts, parts_used, using_parts, len, released, sample, twin):
        self.part_num = part_num
        self.part_name = part_name
        self.part_id = part_id
        self.part_url = part_url
        self.short_desc = short_desc
        self.year = year
        self.sequence = sequence
        #stars 需要再细化
        self.stars = stars
        self.assemble_std = assemble_std
        self.contents = contents
        self.linking_parts = linking_parts
        # how to get
        self.parts_used = parts_used
        self.using_parts = using_parts
        self.len = len
        self.part_type = part_type
        self.team = team
        self.released = released
        self.sample = sample
        self.twin = twin

def main():
    # year = 2020
    # file = 'D:\\2020collection.xlsx'
    # wb = openpyxl.load_workbook(r'D:\\2020collection.xlsx')
    wb = openpyxl.load_workbook(filename='D:\\2020collection.xlsx', read_only=True)
    ws = wb['Sheet']
    # wss = wb.get_sheet_names()
    # ws = wb.get_sheet_by_name(wss[0])
    for row in ws.rows:
        for cell in row:
            print(cell.value)

main()