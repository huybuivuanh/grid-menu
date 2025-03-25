class Trial{
    target;
    totalTime;
    errors = 0;
    correct = 0;
    percent = 0;

    Trial(name){
        this.name = name;
        this.target = 0;
        this.totalTime = 0;
        this.errors = 0;
        this.correct = 0;
        this.percent = 0;
    }

    setTarget(target){
        this.target = target;
    }

    getTarget(){
        return this.target;
    }

    setTotalTime(totalTime){
        this.totalTime = totalTime;
    }

    getTotalTime(){
        return this.totalTime;
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

    setPercent(percent){
        this.percent = percent;
    }

    getPercent(){
        return this.percent;
    }
}

export default Trial;