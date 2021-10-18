class A:
    def __init__(self):
        self.a = "number"
        self.b = True
        self.c = 123456
def main():
    import json
    a = A()
    print (json.dumps(a, default=lambda obj: obj.__dict__, sort_keys=True, indent=4))

main()