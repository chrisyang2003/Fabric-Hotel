import os


def findAllFile(base):
    for root, ds, fs in os.walk(base):
        for f in fs:
            fullname = os.path.join(root, f)
            yield fullname


banlist = [
]


def notban(filename):
    if filename in banlist:
        return False
    else:
        return True


log = open('codeContent.txt', 'w')


floder = ['./lib', './test', './index.js']
def main():
    for i in floder:
        for j in findAllFile(i):
            print('\'' + j + '\'' + ',')

            log.write('='  * 20 + j[1:] + '='  * 20 + '\n')
            log.write(open(j).read())
            log.write('\n')



if __name__ == '__main__':
    main()
