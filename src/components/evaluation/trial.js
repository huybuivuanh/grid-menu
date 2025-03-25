class Trial{
    target;
    errors = 0;
    correct = 0;
    trialNum = 0;

    setTarget(target){
        this.target = target;
    }

    getTarget(){
        return this.target;
    }

    setErrors(errors){
        this.errors = errors;
    }

    getErrors(){
        return this.errors;
    }

    setCorrect(correct){
        this.correct = correct;
    }

    getCorrect(){
        return this.correct;
    }


    setTrialNum(num){
        this.trialNum = num;
    }

    getTrialNum(){
        return this.trialNum;
    }
}

export default Trial;