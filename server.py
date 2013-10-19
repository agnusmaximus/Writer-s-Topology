from bottle import route, run, template, get, post, request, static_file
import urllib
import json

@route('/<filename>')
def return_resource(filename):
    return static_file(filename, root='./')

@route('/<f1>/<f2>/<f3>')
def return_resource2(f1, f2, f3):
    return static_file(f1 + "/" + f2 + "/" + f3, root='./')

@route('/', method='GET')
def writers_topology():
    return static_file("writers_topology.html", root='./')

run(host='localhost', port=8080)
