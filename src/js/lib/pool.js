/**
 * Created by ryan on 9/4/16.
 */
/**
 * The Object Pool. Unused objects are grabbed from the back of
 * the array and pushed to the front of the array. When using an
 * object, if the object is ready to be removed, it splices the
 * array and pushes the object to the back to be reused.
 */
function Pool(poolSize, objClass) {
    var size = poolSize; // Max objects allowed in the pool
    var pool = [];
    /*
     * Populates the pool array with objects
     */
    this.init = function() {
        for (var i = 0; i < size; i++) {
            // Initialize the objects
            var obj = new objClass();
            obj.init();
            pool[i] = obj;
        }
    };
    /*
     * Grabs the last item in the list and initializes it and
     * pushes it to the front of the array.
     */
    this.get = function(opt) {
        // If the last item in the array is in use, the pool is full
        if(!pool[size - 1].inUse) {
            pool[size - 1].spawn(opt);
            pool.unshift(pool.pop());
            return pool[size -1];
        }
    };

    this.getPool = function() {
        return pool;
    }
    /*
     * Uses any alive objects in the pool. If the call returns true,
     * the object is ready to be cleared and reused.
     */
    this.use = function() {
        for (var i = 0; i < size; i++) {
            //.log('pool use iteration');
            // Only use objects that are currently in use
            if (pool[i].inUse) {
                if (pool[i].use(dt)) {
                    pool[i].clear();
                    pool.push((pool.splice(i,1))[0]);
                }
            } else {
                // The first occurrence of an unused item we can
                // break looping over the objects.
                break;
            }
        }
    };
};
