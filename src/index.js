class SmartCalculator {
  
  constructor(initialValue) {
    this.action = {value: 0, add: 1, subtract: 2, multiply: 3, devide: 4, pow: 5}
    this.actions = []
    this.actions.push({value: initialValue, action: this.action.value})
  }

  add(number) {
    this.actions.push({value: number, action: this.action.add})
    return this
  }
  
  subtract(number) {
    this.actions.push({value: number, action: this.action.subtract})
    return this
  }

  multiply(number) {
    this.actions.push({value: number, action: this.action.multiply})
    return this
  }

  devide(number) {
    this.actions.push({value: number, action: this.action.devide})
    return this
  }

  pow(number) {
    this.actions.push({value: number, action: this.action.pow})
    return this
  }

  doAction(action, value1, value2) {
    var result = 0

    switch (action) {
      case this.action.pow:
        result = Math.pow(value1, value2)
        break;
      
      case this.action.devide:
        result = value1 / value2
        break;

      case this.action.multiply:
        result = value1 * value2
        break;
        
      case this.action.subtract:
        result = value1 - value2
        break;

      case this.action.add:
        result = value1 + value2
        break
    }

    return result
  }

  performPriority(matrix, operation1, operation2) {
    var indexMatrix = 0
    var indexResult = 0

    var result = [matrix[indexMatrix]]
    var currentValue = result[indexResult];
    
    while (indexMatrix < matrix.length) { 
        const nextValue = matrix[indexMatrix + 1];
        result[indexResult] = currentValue

        if (nextValue == undefined) {
          break
        }

        if (nextValue.action == operation1 || nextValue.action == operation2) {
           const value = this.doAction(nextValue.action, currentValue.value, nextValue.value)
           currentValue = {value: value, action: currentValue.action}
           indexMatrix++ 
           continue
        } else {
          indexResult++
        }

        indexMatrix++   
        currentValue = matrix[indexMatrix]     
    }

    return result
  }

  valueOf() {
    const performHighPriority = this.performPriority(this.actions, this.action.pow, this.action.pow)
    const performMiddlePriority = this.performPriority(performHighPriority, this.action.multiply, this.action.devide)
    const performLowPriority = this.performPriority(performMiddlePriority, this.action.add, this.action.subtract)
    return  performLowPriority[0].value
  }
}

module.exports = SmartCalculator;
