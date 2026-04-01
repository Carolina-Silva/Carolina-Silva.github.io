try:
    import pypdf
    reader = pypdf.PdfReader('Carolina_Nascimento_Analista_Dados_Junior.pdf')
    for page in reader.pages:
        print(page.extract_text())
except ImportError:
    print('pypdf not installed')
