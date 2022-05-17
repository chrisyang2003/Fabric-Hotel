import os


def findAllFile(base):
    for root, ds, fs in os.walk(base):
        for f in fs:
            fullname = os.path.join(root, f)
            yield fullname


banlist = [
    './printcode.py',
    './requirements.txt',
    './start.sh',
    './manage.py',
    './codeContent.txt',
    './db.sqlite3',
    './server_django/asgi.py',
    './server_django/wsgi.py',
    './server_django/__init__.py',
    './model/migrations/0005_remove_house_views_alter_house_area_and_more.py',
    './model/migrations/0001_initial.py',
    './model/migrations/0007_remove_house_status.py',
    './model/migrations/0003_initial.py',
    './model/migrations/0004_house_area_house_facility_house_livenums_house_views.py',
    './model/migrations/0009_remove_house_facility_remove_house_type_name_and_more.py',
    './model/migrations/0011_rename_tag_names_house_tag.py',
    './model/migrations/0002_delete_test.py',
    './model/migrations/0008_alter_house_facility_alter_house_house_price_and_more.py',
    './model/migrations/0010_alter_house_decs.py',
    './model/migrations/0012_rename_decs_house_desc.py',
    './model/migrations/__init__.py',
    './model/migrations/0006_remove_house_tag_config_ids.py',
]


def notban(filename):
    if filename[-3:] == 'pyc':
        return False
    if filename in banlist:
        return False
    else:
        return True


log = open('codeContent.txt', 'w')


def main():
    for i in findAllFile('./'):
        if notban(i):
            # print('\'' + i + '\'' + ',')

            # f = open(i, 'r')
            # content = f.read()
            # print(i)
            # print(open(i).read())
            log.write('='  * 20 + i[1:] + '='  * 20 + '\n')
            log.write(open(i).read())
            log.write('\n')


if __name__ == '__main__':
    main()
