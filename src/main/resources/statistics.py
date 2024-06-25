import matplotlib.pyplot as plt
import numpy as np
import sys

def statistics(l, image_path):
    indici = np.arange(len(l))
    plt.plot(indici, l, marker='o')
    plt.title('Graficul dispozitiei in ultimele 14 zile')
    plt.ylabel('Starea zilei')
    plt.ylim(0, 6)
    plt.savefig(image_path)  # Salvăm imaginea în fișierul specificat
    plt.close()

    media = np.mean(l)
    dispersie = np.var(l)
    print("Dispoziția medie:", media)
    print("Instabilitatea de dispoziție:", dispersie)

if __name__ == "__main__":
    l = list(map(int, sys.argv[1:15]))  # Prima parte a argumentelor sunt datele
    image_path = sys.argv[15]  # Ultimul argument este calea către imaginea de salvat
    statistics(l, image_path)