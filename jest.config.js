export const testEnvironment = 'jsdom';
export const moduleNameMapper = {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^bootstrap$': '<rootDir>/src/__mocks__/bootstrap.js',
};
export const moduleDirectories = ['node_modules', 'src'];