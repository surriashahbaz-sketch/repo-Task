#include <iostream>
#include <string>
using namespace std;
class Thermostat {
private:
    string roomName;
    double temperature;
public:
    Thermostat(string name, double temp) {
        roomName = name;
        temperature = temp;
    }
    double getTemperature() {
        return temperature;
    }
    void setTemperature(double temp) {
        if (temp >= 16.0 && temp <= 30.0) {
            temperature = temp;
        }
        else {
            cout << "Error: " << temp << "C is outside the hardware limits (16.0C - 30.0C)." << endl;
        }
    }
};
int main() {
    Thermostat t("Living Room", 22.5);
    t.setTemperature(35.0);
    t.setTemperature(18.0);
    cout << "Current Temp: " << t.getTemperature() << "C" << endl;
    return 0;
}