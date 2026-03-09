#include <iostream>
#include <string>
using namespace std;
class SnackSlot {
private:
    string snackName;
    double price;
    int stockQuantity;    
public:
    SnackSlot(string name, double p, int stock) {
        snackName = name;
        price = p;
        stockQuantity = stock;
    }  
    string getSnackName() {
        return snackName;
    }
    double getPrice() {
        return price;
    }    
    int getStockQuantity() {
        return stockQuantity;
    }
    void buySnack(int quantity) {
        if (stockQuantity >= quantity) {
            stockQuantity -= quantity;
            cout << "Dispensing..." << endl;
        } else {
            cout << "Transaction failed: Insufficient stock!" << endl;
        }
    }
};
int main() {
    SnackSlot slot("Chips", 1.50, 5);
    slot.buySnack(3);
    slot.buySnack(4);
    cout << "Remaining Stock: " << slot.getStockQuantity() << endl;
    return 0;
}