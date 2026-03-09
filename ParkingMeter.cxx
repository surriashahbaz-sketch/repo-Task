#include <iostream>
using namespace std;
class ParkingMeter {
private:
    int timeRemaining;
    const int maxTime;  
public:
    ParkingMeter() : maxTime(120) {
        timeRemaining = 0;
    }
   int getTimeRemaining() {
        return timeRemaining;
    }
      void addTime(int minutes) {
        if (timeRemaining + minutes > maxTime) {
            timeRemaining = maxTime;
            cout << "Max time reached. Excess coins refunded." << endl;
        } else {
            timeRemaining += minutes;
        }
    }
};
int main() {
    ParkingMeter meter;
    meter.addTime(60);
    meter.addTime(90);
    cout << "Time on meter: " << meter.getTimeRemaining() << " mins" << endl;
    return 0;
}