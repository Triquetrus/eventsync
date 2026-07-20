import sys

with open('src/components/GenAITools.jsx', 'r') as f:
    content = f.read()

content = content.replace('{!selectedMedia && activeTab === "analyze" && (', '{activeTab === "analyze" && (')

with open('src/components/GenAITools.jsx', 'w') as f:
    f.write(content)
print("Done!")
