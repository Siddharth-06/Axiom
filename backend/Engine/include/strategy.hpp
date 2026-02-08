#pragma once
#include <vector>
#include <string>
#include "MarketSimulator.hpp"

enum class OperandType {
    CONSTANT,
    SIGNAL
};

struct Condition {
    SignalType lhs;
    char op;           // '<', '>', '='
    OperandType rhs_type;
    double rhs_value;  // if CONSTANT
    SignalType rhs_signal; // if SIGNAL
};

enum class LogicType { AND, OR };

enum class Operator{
    LT,
    GT
};
 
struct Strategy {
    std::string name;
    LogicType buy_logic = LogicType::AND;
    LogicType sell_logic = LogicType::AND;
    std::vector<Condition> buy;
    std::vector<Condition> sell;
    bool isValid(const MarketSimulator& sim) const;
};

struct StrategyState {
    bool position_open = false;
    double entry_price = 0.0;
    double pnl = 0.0;
};


