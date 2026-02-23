import sys
path=r"c:\Users\Ntlala\Desktop\coding\web sites\done\ambassador-school-website\components\application-modal.tsx"
with open(path,encoding='utf-8') as f:
    lines=f.readlines()
for i,line in enumerate(lines, start=1):
    if 440 <= i <= 460 or 570 <= i <= 590:
        sys.stdout.write(f"{i:4d}: {line}")
