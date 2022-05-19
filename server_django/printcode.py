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
